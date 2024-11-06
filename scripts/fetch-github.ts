import { Octokit } from 'npm:octokit';
import { writeFile } from 'node:fs/promises';
import { parse } from "jsr:@std/yaml";
import process from "node:process";
import path from 'node:path';
import repositories from './repositories.json' with { type: "json" };
import 'npm:dotenv/config';

interface Repository {
  name: string;
  description: string | null;
  url: string;
  topics: string[];
  lastUpdate: Date;
  languages: {
    [key: string]: number;
  };
  readme: string | null;
}

async function fetchRepositoryData() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required')
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const reposetoriesData: Repository[] = [];
  for (const { owner, repo } of repositories) {
    const { data: repositoryData } = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });

    const { data: languagesData } = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });

    let readmeData;
    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      });
      readmeData = data.content;
    } catch (error) {
      console.error(`Failed to fetch README for ${owner}/${repo}`);
      readmeData = null;
    }

    reposetoriesData.push({
      name: repositoryData.name,
      description: repositoryData.description,
      topics: repositoryData?.topics ?? [],
      url: repositoryData.html_url,
      lastUpdate: new Date(repositoryData.updated_at),
      languages: languagesData,
      readme: readmeData,
    });
  }

  return reposetoriesData;
}

interface Language {
  [key: string]: {
    color: string;
    extensions: string[];
    tm_scope: string;
    aliases: string[];
    ace_mode: string;
    codemirror_mode: string;
    codemirror_mime_type: string;
    language_id: number;
  }
}

async function fetchLanguagesColors(REPOSITORIES_DATA: Repository[]) {
  const response = await fetch('https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml');
  const data = parse(await response.text()) as Language[];

  return REPOSITORIES_DATA.reduce((acc: { [key: string]: string }, repo) => {
    for (const language in repo.languages) {
      if (language in data) {
        // @ts-ignore - The warning is incorrect
        acc[language] = data[language].color;
      }
    }
    return acc;
  }, {});
}

async function main() {
  const repositories = await fetchRepositoryData();
  const filePath = path.join(process.cwd(), 'src', 'assets', 'repositories.json');
  await writeFile(filePath, JSON.stringify(repositories));

  const languages = await fetchLanguagesColors(repositories);
  const languagesFilePath = path.join(process.cwd(), 'src', 'assets', 'languages.json');
  await writeFile(languagesFilePath, JSON.stringify(languages));
}

main();
