CD =	[ -d src/handlers/$(HANDLER) ] && cd src/handlers/$(HANDLER)
ENV =	_YOUR_ENV_
S3_BUCKET =	_YOUR_S3_BUCKET_
HANDLER =	_YOUR_HANDLER_
SERVICE =	external-module

module:
	@$(CD) && \
	if [ -f Dockerfile ]; then \
		docker run --rm -v `pwd`:/app/vendored -t $(SERVICE)/$(HANDLER); \
	elif [ -f requirements.txt -a ! -f Dockerfile ]; then \
		pip install -r requirements.txt -t .; \
	else \
		:; \
	fi

package:
	@[ -d .sam ] || mkdir .sam
	@aws cloudformation package \
		--template-file sam.yml \
		--s3-bucket $(S3_BUCKET) \
		--s3-prefix sam/$(SERVICE)/$(ENV)/`date '+%Y%m%d'` \
		--output-template-file .sam/packaged.yml

deploy:
	@if [ -f params/param.$(ENV).txt ]; then \
		aws cloudformation deploy \
		--template-file .sam/packaged.yml \
		--stack-name $(SERVICE)-$(ENV) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--parameter-overrides `cat params/param.$(ENV).txt | tr '\n' ' ' | awk '{print}'`; \
	else \
		aws cloudformation deploy \
		--template-file .sam/packaged.yml \
		--stack-name $(SERVICE)-$(ENV) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM; \
	fi


all: module package deploy

.PHONY: module package deploy all
