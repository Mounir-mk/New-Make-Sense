const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;

  const checkDecisionStatus = (decisions) => {
    return Promise.all(
      decisions.map(async (decision) => {
        const decisionCopy = { ...decision };
        if (decisionCopy.status === "in_progress") {
          const today = new Date();
          const deadline = new Date(decisionCopy.deadline);
          if (today > deadline) {
            const newDecision = await prisma.decision.update({
              where: {
                id: decisionCopy.id,
              },
              data: {
                status: "finished",
              },
            });
            decisionCopy.status = newDecision.status;
          }
        }
        return decisionCopy;
      })
    );
  };

  const mutateDecisions = (decisions) => {
    return decisions.map((decision) => {
      const decisionCopy = { ...decision };
      decisionCopy.firstname = decisionCopy.user.firstname;
      decisionCopy.lastname = decisionCopy.user.lastname;
      decisionCopy.image_url = decisionCopy.user.image_url;
      delete decisionCopy.user;
      return decisionCopy;
    });
  };

  const options = {
    select: {
      id: true,
      title: true,
      publish_date: true,
      deadline: true,
      status: true,
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          image_url: true,
        },
      },
    },
  };

  const findDecisions = async (role, opts, id) => {
    if (role !== "visitor") {
      return prisma.decision.findMany(opts);
    }
    if (role === "visitor") {
      return prisma.decision.findMany({
        ...opts,
        where: {
          concerned: {
            some: {
              user_id: id,
            },
          },
        },
      });
    }
    return Promise.resolve();
  };

  const decisions = await findDecisions(userRole, options, userId);
  const decisionsWithStatus = await checkDecisionStatus(decisions);
  const decisionsMutated = mutateDecisions(decisionsWithStatus);
  res.status(200).json(decisionsMutated);
};

const read = async (req, res) => {
  const decision = await prisma.decision.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
    select: {
      id: true,
      title: true,
      publish_date: true,
      deadline: true,
      status: true,
      start_content: true,
      impact: true,
      risk: true,
      advantage: true,
      middle_decision: true,
      final_decision: true,
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          image_url: true,
        },
      },
      concerned: {
        select: {
          user_status: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              image_url: true,
            },
          },
        },
      },
      comment: {
        select: {
          id: true,
          content: true,
          user_id: true,
          decision_id: true,
          date: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              image_url: true,
            },
          },
        },
      },
    },
  });
  const decisionToMutate = { ...decision };
  decisionToMutate.user_id = decision.user.id;
  decisionToMutate.firstname = decision.user.firstname;
  decisionToMutate.lastname = decision.user.lastname;
  decisionToMutate.image_url = decision.user.image_url;
  delete decisionToMutate.user;
  decisionToMutate.concerned.map((concerned) => {
    const concernedToMutate = concerned;
    concernedToMutate.id = concerned.user.id;
    concernedToMutate.firstname = concerned.user.firstname;
    concernedToMutate.lastname = concerned.user.lastname;
    concernedToMutate.image_url = concerned.user.image_url;
    delete concernedToMutate.user;
    return null;
  });
  decisionToMutate.comment.map((comment) => {
    const commentToMutate = comment;
    commentToMutate.user_id = comment.user.id;
    commentToMutate.firstname = comment.user.firstname;
    commentToMutate.lastname = comment.user.lastname;
    commentToMutate.image_url = comment.user.image_url;
    delete commentToMutate.user;
    return null;
  });

  res.send(decisionToMutate);
};

const edit = async (req, res) => {
  const data = req.body;
  data.id = parseInt(req.params.id, 10);

  const decision = await prisma.decision.update({
    where: {
      id: parseInt(req.params.id, 10),
    },
    data,
  });

  res.status(204).json({ message: "Decision updated", decision });
};

const add = async (req, res) => {
  const {
    title,
    deadline,
    // eslint-disable-next-line camelcase
    start_content,
    impact,
    risk,
    advantage,
    userId,
    users,
  } = req.body;

  const decision = await prisma.decision.create({
    data: {
      title,
      deadline: new Date(deadline),
      // eslint-disable-next-line camelcase
      start_content,
      impact,
      risk,
      advantage,
      user_id: userId,
      concerned: {
        create: users.map((user) => ({
          user_id: user.user_id,
          user_status: user.user_status,
        })),
      },
    },
  });

  res.status(201).json(decision.id);
};

const destroy = async (req, res) => {
  await prisma.decision.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  res.status(204).json("Decision deleted");
};

const addCommentToDecision = async (req, res) => {
  const { content, userId, decisionId } = req.body;
  const comment = await prisma.comment.create({
    data: {
      content,
      user_id: parseInt(userId, 10),
      decision_id: parseInt(decisionId, 10),
    },
  });
  res.status(201).json(comment.id);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  addCommentToDecision,
};
