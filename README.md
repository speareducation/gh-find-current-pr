# gh-find-current-pr

This action tries to figure out the current PR.

Adaptation from: https://github.com/jwalton/gh-find-current-pr

The difference is this implementation uses the search api instead of "listPullRequestsAssociatedWithCommit".

If the event is a `pull_request`, it's very easy to get the current PR number
from the context via `${{ github.event.number }}`, but unfortunately this
information does not seem to be readily available for a `push` event.  This
action sends a request to GitHub to find the PR associated with the current SHA,
and returns its number in the `number` output. `number` will be an empty string if there is no
PR.

Additionally, `title` and `body` outputs are available as well to get the respective title and body of the PR.

## Usage

```yaml
    steps:
      - uses: actions/checkout@v1
      # Find the PR associated with this push, if there is one.
      - uses: speareducation/gh-find-current-pr@v1
        id: findPr
      # This will echo "Your PR is 7", or be skipped if there is no current PR.
      - run: echo "Your PR is ${PR}"
        if: success() && steps.findPr.outputs.number
        env:
          PR: ${{ steps.findPr.outputs.pr }}
```
