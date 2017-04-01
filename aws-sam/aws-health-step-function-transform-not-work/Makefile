STAGE = _YOUR_STAGE_
S3_BUCKET = _YOUR_S3_BUCKET_
STAGE = _YOUR_STAGE_
STACK_NAME = aws-health-step-function

package:
	@[ -d .sam ] || mkdir .sam
	@aws s3 cp src/templates/step-function.yml s3://$(S3_BUCKET)
	@aws cloudformation package \
		--template-file sam.yml \
		--s3-bucket $(S3_BUCKET) \
		--s3-prefix sam/$(STACK_NAME)/$(STAGE)/`date '+%Y%m%d'` \
		--output-template-file .sam/packaged.yml

deploy:
	@if [ -f params/param.$(STAGE).json ]; then \
		aws cloudformation deploy \
			--template-file .sam/packaged.yml \
			--stack-name $(STACK_NAME)-$(STAGE) \
			--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
			--parameter-overrides `cat params/param.$(STAGE).json | jq -r '.Parameters | to_entries | map("\(.key)=\(.value|tostring)") | .[]' | tr '\n' ' ' | awk '{print}'` \
			--no-execute-changeset; \
	else \
		aws cloudformation deploy \
			--template-file .sam/packaged.yml \
			--stack-name $(STACK_NAME)-$(STAGE) \
			--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
			--no-execute-changeset; \
	fi

execute-changeset:
	@aws cloudformation execute-change-set \
		--stack-name $(STACK_NAME)-$(STAGE) \
		--change-set-name `aws cloudformation list-change-sets \
			--stack-name $(STACK_NAME)-$(STAGE) \
			--query 'reverse(sort_by(Summaries,&CreationTime))[0].ChangeSetName' \
			--output text`

all: package deploy execute-changeset

.PHONY: package deploy execute-changeset all
