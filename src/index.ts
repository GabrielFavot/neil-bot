import { Probot } from 'probot';

const typoList = ['niel', 'nil', 'nile', 'neal', 'nils', 'nail'];

const warningMessage = "IT'S **NEIL**!!!  😡";

function containsTypo(comment: string): boolean {
  return typoList.some((typo) => comment.includes(typo));
}

export = (app: Probot) => {
  app.on(['issue_comment'], async (context) => {
    if (containsTypo(context.payload.comment.body)) {
      context.octokit.issues.createComment(
        context.issue({ body: warningMessage })
      );
    }
  });
};
