ENV = _YOUR_ENV_
S3_BUCKET = _YOUR_S3_BUCKET_
SERVICE = swagger-external

package:
	@[ -d .sam ] || mkdir .sam
	@aws cloudformation package \
		--template-file sam.yml \
		--s3-bucket $(S3_BUCKET) \
		--s3-prefix sam/$(SERVICE)/`date '+%Y%m%d'` \
		--output-template-file .sam/packaged.yml

deploy:
	@if [ -f params/param.$(ENV).ini ]; then \
		aws cloudformation deploy \
			--template-file .sam/packaged.yml \
			--stack-name $(SERVICE)-$(ENV) \
			--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
			--parameter-overrides `cat params/param.$(ENV).ini | tr '\n' ' ' | awk '{print}'`; \
	else \
		aws cloudformation deploy \
			--template-file .sam/packaged.yml \
			--stack-name $(SERVICE)-$(ENV) \
			--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM; \
	fi


all: package deploy

.PHONY: package deploy all
