```bash
# List state machines
$> aws stepfunctions --endpoint http://localhost:4584 list-state-machines

# Create a new state machine
$> aws stepfunctions --endpoint http://localhost:4584 create-state-machine --name my-state-machine --definition '{"Comment":"A Hello World example of the Amazon States Language using a Pass state","StartAt":"HelloWorld","States":{"HelloWorld":{"Type":"Pass","End":true}}}' --role-arn arn:aws:iam::0123456789:role/service-role/MyRole

# Describe state machine
$> aws stepfunctions --endpoint http://localhost:4584 describe-state-machine --state-machine-arn arn:aws:states:local:0123456789:stateMachine:my-state-machine

# Start state machine execution
$> aws stepfunctions --endpoint http://localhost:4584 start-execution --state-machine-arn arn:aws:states:local:0123456789:stateMachine:my-state-machine --name my-execution --input '{"comment":"I am a great input !"}'

# List state machine executions
$> aws stepfunctions --endpoint http://localhost:4584 list-executions --state-machine-arn arn:aws:states:local:0123456789:stateMachine:my-state-machine

# Describe execution
$> aws stepfunctions --endpoint http://localhost:4584 describe-execution --execution-arn arn:aws:states:local:0123456789:execution:my-state-machine:my-execution

# Describe state machine related to execution
$> aws stepfunctions --endpoint http://localhost:4584 describe-state-machine-for-execution --execution-arn arn:aws:states:local:0123456789:execution:my-state-machine:my-execution

# Get execution history
$> aws stepfunctions --endpoint http://localhost:4584 get-execution-history --execution-arn arn:aws:states:local:0123456789:execution:my-state-machine:my-execution
```
