export const statList = ["str", "dex", "con", "int", "wis", "cha"]
export const calculateMod = (stat, returnNumber = false) => {
    if (!stat) return ""
    let mod = Math.floor(stat / 2 - 5).toString()
    if (returnNumber) {
        return mod
    }
    if (mod >= 0) {
        mod = "+" + mod
    }
    return mod
}

export const Stats = (monsterStats) => {
    const statLine = statList.map(stat => <td>{monsterStats[stat]} ({calculateMod(monsterStats[stat])})</td>)
    return (
        <table className="stats">
            <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
            <tr>{statLine}</tr>
        </table>
    )
}
