const createJob = async (req, res) => {
  res.send("createJob function");
};

const getAllJobs = async (req, res) => {
  res.send("getAllJobs function");
};

const updateJob = async (req, res) => {
  res.send("updateJob function");
};

const deleteJob = async (req, res) => {
  res.send("deleteJob function");
};

const showStats = async (req, res) => {
  res.send("showStats function");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
