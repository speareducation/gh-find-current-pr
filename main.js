const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const token = core.getInput('github-token', { required: true });
    const sha = core.getInput('sha', { required: true});

    const octokit = github.getOctokit(token)
    const context = github.context;

    const { data: result } = await octokit.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
    });

    const pr = result.length > 0 && result.filter(el => el.state === 'open' && el.head.sha === sha)[0];

    core.setOutput('pr', pr && pr.number || '');
    core.setOutput('number', pr && pr.number || '');
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));
