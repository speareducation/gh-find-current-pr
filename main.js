const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const token = core.getInput('github-token', { required: true });
    const sha = core.getInput('sha', { required: true});

    const octokit = github.getOctokit(token)
    const context = github.context;

    const { data: result } = await octokit.search.issuesAndPullRequests({
        q: 'q=' + sha + "&state:open"
    });

    const items = result.items
    const pr = items.length > 0 && items.filter(el => el.state === 'open')[0];

    core.setOutput('pr', pr && pr.number || '');
    core.setOutput('number', pr && pr.number || '');
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));
