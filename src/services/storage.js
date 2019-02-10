class Storage {
    static saveWorkload(workload) {
        localStorage.setItem('workload', JSON.stringify(workload));
    };

    static loadWorkload() {
        return JSON.parse(localStorage.getItem('workload'));
    };

    static saveLanguage(language) {
        localStorage.setItem('language', language);
    };

    static loadLanguage() {
        return localStorage.getItem('language');
    };
}

export { Storage };
