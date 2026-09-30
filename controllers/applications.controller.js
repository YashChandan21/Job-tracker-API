const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data.json");

function readData() {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw).applications;
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ applications: data }, null, 2), "utf-8");
}

function sendSuccess(res, status, data){
    res.status(status).json({ success: true, data});
}

function sendError(res, status, message){
    res.status(status).json({ success : false, error: message});
}


exports.getAllApplications = (req, res) => {
    const { status, sort, page, limit } = req.query;

    let result = readData();

    if (status) {
        result = result.filter((app) => app.status === status);
    }

    if (sort === "date"){
        result = result
                    .slice()
                    .sort((a, b) => (a.appliedDate > b.appliedDate ? 1: -1)); 
    }

    if(page && limit){
        const pageNum = Number(page);
        const limitNum = Number(limit);

        const start = (pageNum - 1) * limitNum;
        result = result.slice(start, start + limitNum);
    }

    sendSuccess(res, 200, result);

};

exports.getApplicationById = (req, res) => {
    const id = Number(req.params.id);
    const applications = readData().find((app) => app.id === id);

    if(!applications){
        return sendError(res, 404, "Application not found");
    }

    sendSuccess(res, 200, applications);
}

exports.getStats = (req, res) =>{
    const applications = readData();

    console.log(applications);

    const length = applications.length;

    const byStatus = applications.reduce((stats, app) => {
        const status = app.status;

        stats[status] = (stats[status] || 0) + 1;

        return stats;
    }, {});

    sendSuccess(res, 200, { total: length, byStatus });
}

exports.createApplication = (req, res) => {
    const {company, role, status } = req.body;

    if(!company || !role){
        return sendError(res, 400, "Company and role are required");
    }
        const applications = readData();

        const nextId = applications.length > 0 ? Math.max(...applications.map((app) => app.id)) + 1 : 1;

        const appliedDate = new Date().toISOString().split("T")[0];

        const newApplication = {
            id: nextId,
            company,
            role,
            status: status || "applied",
            appliedDate
        };

        applications.push(newApplication);
        writeData(applications);

        sendSuccess(res, 201, newApplication);
};

exports.updateApplication = (req, res) => {
    const id = Number(req.params.id);

    const applications = readData();
    const application = applications.find((app) => app.id === id);

    if(!application){
        return sendError(res, 404, "Application not found");
    }

    const { company, role, status} = req.body;
    if(company !== undefined) application.company = company;
    if(role !== undefined) application.role = role;
    if(status !== undefined) application.status = status;

    writeData(applications);

    sendSuccess(res, 200, application);
};

exports.deleteApplication = (req, res) => {
    const id = Number(req.params.id);

    const applications = readData();
    const index = applications.findIndex((app) => app.id === id);

    if(index === -1){
        sendError(res, 404, "Application not found");
    }

    applications.splice(index, 1);
    writeData(applications);

    res.status(204).end();
};