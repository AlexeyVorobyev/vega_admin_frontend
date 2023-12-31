type TConfig = {
    api_host: string
    stats1: string
    stats2: string
}

const CONFIG: TConfig = {
    api_host: import.meta.env.VITE_APP_API_HOST || 'http://194.67.112.88:16666/',
    stats1: import.meta.env.VITE_APP_STATS1 || 'http://194.67.112.88:3000/d-solo/f098263b-340f-4289-8249-9a28c9b7b541/vega?orgId=1&from=1702992217764&to=1703013817764&theme=light&panelId=1',
    stats2: import.meta.env.VITE_APP_STATS2 || 'http://194.67.112.88:3000/d-solo/f098263b-340f-4289-8249-9a28c9b7b541/vega?orgId=1&from=1702992217764&to=1703013817764&theme=light&panelId=1'
}

export default CONFIG