export default (req, res) => {
    const versionWorking = process.env.SERVICE_NAME

    res.status(200).json(versionWorking)
}