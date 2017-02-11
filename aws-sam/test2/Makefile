S3_BUCKET = _YOUR_S3_BUCKET_
STACK = serverless-application-model-test

package:
	@[[ -f src/handlers/$(handler)/requirements.txt ]] \
		&& pip install -r src/handlers/$(handler)/requirements.txt -t src/handlers/$(handler)/vendored
	@aws cloudformation package \
		--template-file sam.yml \
		--s3-bucket ${S3_BUCKET} \
		--s3-prefix sam/${STACK}/$(env)/`date '+%Y%m%d'` \
		--output-template-file .sam/packaged.yml

deploy:
	@aws cloudformation deploy \
		--template-file .sam/packaged.yml \
		--stack-name ${STACK}-$(env) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--parameter-overrides `cat params/param.$(env).txt | tr '\n' ' ' | awk '{print}'`

.PHONY: package deploy
