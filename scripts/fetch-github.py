#!/usr/bin/env python3
import os
import json
import yaml
import requests
from datetime import datetime
import dotenv
from pathlib import Path

dotenv.load_dotenv()

class GitHubDataFetcher:
    def __init__(self):
        self.github_token = os.environ.get("GITHUB_TOKEN")
        if not self.github_token:
            raise ValueError("GITHUB_TOKEN is required")

        self.headers = {
            "Authorization": f"token {self.github_token}",
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }

        script_dir = Path(__file__).parent
        with open(script_dir / "repositories.json", "r") as f:
            self.repositories = json.load(f)

    def fetch_repository_data(self):
        repositories_data = []

        for repo_info in self.repositories:
            owner = repo_info["owner"]
            repo = repo_info["repo"]

            # Fetch repository data
            repo_response = requests.get(
                f"https://api.github.com/repos/{owner}/{repo}",
                headers=self.headers
            )
            repo_response.raise_for_status()
            repository_data = repo_response.json()

            # Fetch languages data
            languages_response = requests.get(
                f"https://api.github.com/repos/{owner}/{repo}/languages",
                headers=self.headers
            )
            languages_response.raise_for_status()
            languages_data = languages_response.json()

            # Fetch README data
            readme_content = None
            try:
                readme_response = requests.get(
                    f"https://api.github.com/repos/{owner}/{repo}/readme",
                    headers=self.headers
                )
                readme_response.raise_for_status()
                readme_content = readme_response.json().get("content")
            except Exception as e:
                print(f"Failed to fetch README for {owner}/{repo}: {e}")

            repositories_data.append({
                "name": repository_data.get("name"),
                "description": repository_data.get("description"),
                "topics": repository_data.get("topics", []),
                "url": repository_data.get("html_url"),
                "lastUpdate": repository_data.get("updated_at"),
                "languages": languages_data,
                "readme": readme_content
            })

        return repositories_data

    def fetch_languages_colors(self, repositories_data):
        response = requests.get(
            "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
        )
        response.raise_for_status()
        languages_data = yaml.safe_load(response.text)

        language_colors = {}
        for repo in repositories_data:
            for language in repo["languages"]:
                if language in languages_data and "color" in languages_data[language]:
                    language_colors[language] = languages_data[language]["color"]

        return language_colors

    def main(self):
        repositories = self.fetch_repository_data()

        # Ensure directories exist
        output_dir = Path(os.getcwd()) / "src" / "lib" / "assets" / "json"
        output_dir.mkdir(parents=True, exist_ok=True)

        # Save repositories data
        with open(output_dir / "repositories.json", "w") as f:
            json.dump(repositories, f)

        # Fetch and save language colors
        languages = self.fetch_languages_colors(repositories)
        with open(output_dir / "languages.json", "w") as f:
            json.dump(languages, f)


if __name__ == "__main__":
    fetcher = GitHubDataFetcher()
    fetcher.main()
