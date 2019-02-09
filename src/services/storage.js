class Storage {
    static saveWorkload(workload) {
        localStorage.setItem('workload', JSON.stringify(workload));
    };

    static loadWorkload() {
        return JSON.parse(localStorage.getItem('workload'));
    };
}

export { Storage };
