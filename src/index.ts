import { Probot } from 'probot';

// TODO COMPLET BY NEIL
const typoList = ['niel', 'nil', 'nile']; 

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
