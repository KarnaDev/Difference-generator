install:
	npm ci

publish:
	npm publish --dry-run 

link:
	npm link

lint:
	npx eslint .

fix:
	npx eslint . --fix

test: 
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-all: test-coverage lint