import { Budget, BackupBudget } from "../models/budget.js"
import checkBackup from "./checkBackup.js"
import checkBudget from "./checkBudget.js"

export default async () => {
    const masterDB = await checkBudget()
    const backup = await checkBackup()

    console.log(masterDB, "---------", backup)
}