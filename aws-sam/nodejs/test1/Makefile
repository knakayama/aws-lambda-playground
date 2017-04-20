S3_BUCKET = _YOUR_S3_BUCKET_
SERVICE = nodejs-test1

package:
	@[ -d .sam ] || mkdir .sam
	@aws cloudformation package \
		--template-file sam.yml \
		--s3-bucket $(S3_BUCKET) \
		--s3-prefix sam/$(SERVICE)/`date '+%Y%m%d'` \
		--output-template-file .sam/packaged.yml

deploy:
	@aws cloudformation deploy \
		--template-file .sam/packaged.yml \
		--stack-name $(SERVICE) \
		--capabilities CAPABILITY_IAM


all: package deploy

.PHONY: package deploy all
