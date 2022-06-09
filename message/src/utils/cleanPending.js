export default async (databases) => {
  databases.forEach(async (database) => {
    const dataPendings = await database.find({ status: "PENDING" });
    const completedData = await database.find({
      $or: [{ status: "OK" }, { status: "ERROR" }],
    });

    dataPendings.forEach((data) => {
      completedData.forEach((completed) => {
        if (data.statusId === completed.statusId) {
          database
            .findByIdAndDelete({ _id: data._id })
            .catch((err) => console.log(err));
        }
      });
    });
  });
};
