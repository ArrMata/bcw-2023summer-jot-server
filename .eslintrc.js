module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true,
		"jest": true
	},
	"extends": [
		"airbnb-base"
	],
	"parserOptions": {
		"ecmaVersion": 15
	},
	"ignorePatterns": [".eslintrc.js"],
	"rules": {
		"linebreak-style": ["error", "windows"],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"no-underscore-dangle": 0,
		"no-console": 0,
		"max-classes-per-file": 0
	}
};
