default:
	@npm run build:develop
	@echo '';echo 'bundle.js';ls -lhS ./out | grep bundle.js | awk '{print $$5}'

release:
	@npm run build:release
	@echo '';echo 'bundle.js';ls -lhS ./out | grep bundle.js | awk '{print $$5}'

watch:
	@npm run watch

start:
	@npm run start

clean:
	@npm run clean
