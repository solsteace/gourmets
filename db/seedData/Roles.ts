export const roleSeed = [
    {
        "id": 1,
        "name": "superadmin",
        "description": "Can manage every places",
    },
    {
        "id": 2,
        "name": "user",
        "description": "Often use the app just for the service it provides"
    },
    {
        "id": 3,
        "name": `po_${1}`,
        "description": `Owner, place:${1}`
    },
    {
        "id": 4,
        "name": `po_${2}`,
        "description": `Owner, place:${2}`
    },
    {
        "id": 5,
        "name": `ba_${1}`,
        "description": `Admin, place:${1} branch:${1}`
    },
    {
        "id": 6,
        "name": `ba_${2}`,
        "description": `Admin, place:${1} branch:${2}`
    },
    {
        "id": 7,
        "name": `ba_${3}`,
        "description": `Admin, place:${2} branch:${3}`
    },
]