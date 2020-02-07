# Execute in Mac using: ./@ELTOROIT/scripts/CreateOrg.sh
echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias AsyncJS -d 5
echo "*** Opening scratch Org..."
sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
sfdx force:source:push
echo "*** Assigning permission set to your user..."
sfdx force:user:permset:assign --permsetname AsyncJS
echo "*** Execute Apex..."
sfdx force:apex:execute -f EXFiles/data/ExecuteApex.txt
echo "*** Creating data using ETCopyData plugin"
# sfdx ETCopyData:export -c EXFiles/data --loglevel warn
# sfdx ETCopyData:import -c EXFiles/data --loglevel warn
