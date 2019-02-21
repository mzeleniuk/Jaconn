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

    static saveAppVersion(version) {
        localStorage.setItem('app-version', version);
    };

    static loadAppVersion() {
        return localStorage.getItem('app-version');
    };

    static clearStorage() {
        localStorage.removeItem('app-version');
        localStorage.removeItem('workload');
        localStorage.removeItem('language');
    };
}

export { Storage };
