function getCorrectI18nFile(){
	var currentLanguage = _getCurrentLanguage();
	var closestLanguage;

	switch (currentLanguage) {
		case 'en': 
			closestLanguage = 'en';
			break;
		case 'ru':
			closestLanguage = 'ru';
			break;
		default:
			closestLanguage = 'en';
	}

	return YAML.load(closestLanguage +'.yaml'); 
};

function _getCurrentLanguage(){
	var locale = navigator.language || navigator.userLanguage;
	return locale.substring(0,2).toLowerCase();
};

export default getCorrectI18nFile;
