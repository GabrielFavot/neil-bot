import { Probot } from "probot";

const typoList = ["niel", "nil", "nile"]; // TO COMPLET BY NEIL

const waringMessage = "IT'S *NEIL*";

function containsTypo(comment: string): boolean {
  return typoList.some((typo) => comment.includes(typo));
}

export = (app: Probot) => {
  app.onAny(async (context) => {
    app.log.info(context.payload);
  });

  app.on("pull_request_review_comment", async (context) => {
    if (
      context.payload.action === "created" &&
      containsTypo(context.payload.comment.body)
    ) {
      context.octokit.pulls.createReplyForReviewComment({
        body: waringMessage,
        comment_id: context.payload.comment.id,
        pull_number: context.payload.pull_request.id,
        repo: context.payload.repository.url,
        owner: "BOT",
      });
    }
  });
};
