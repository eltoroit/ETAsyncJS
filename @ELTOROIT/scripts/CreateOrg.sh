# Execute in Mac using: ./@ELTOROIT/scripts/CreateOrg.sh
### START: Functions
function showStatus() {
  echo "\033[35m$1\033[0m"
}
function showPrompt() {
  echo "\033[31mOperation Completed\033[0m"
  # echo "\033[31m$1\033[0m"
  # pause 'Press [Enter] key to continue...'
}
function pause(){
   read -p "$*"
}
### END: Functions

# ---
showStatus "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias AsyncJS -d 1
showPrompt "Confirm..."

# ---
showStatus "*** Opening scratch Org..."
sfdx force:org:open
showPrompt "Confirm..."

# ---
### Winter '20, Org had to be configured for app pages to work on multipe factors. No need for Spring '20
### sfdx force:org:open --path=/lightning/setup/SalesforceMobileAppQuickStart/home
### showPrompt "Configure metadata before pushing"

# ---
showStatus "*** Pushing metadata to scratch Org..."
sfdx force:source:push
showPrompt "Confirm..."

# ---
showStatus "*** Assigning permission set to your user..."
sfdx force:user:permset:assign --permsetname AsyncJS --json
showPrompt "Confirm..."

# ---
showStatus "*** Execute Anonymous Apex..."
sfdx force:apex:execute -f './@ELTOROIT/scripts/AnonymousApex.txt'
showPrompt "Confirm..."

---
# showStatus "*** Creating data using ETCopyData plugin"
# sfdx ETCopyData:export -c './@ELTOROIT/data' --loglevel trace --json
# sfdx ETCopyData:import -c './@ELTOROIT/data' --loglevel trace --json
# showPrompt "Confirm..."

# ---
# showStatus "Runing Apex tests"
# sfdx force:apex:test:run --codecoverage --synchronous --verbose --json --resultformat json | jq 'del(.result.tests, .result.coverage)' --json
# showPrompt "Confirm..."

# ---
# showStatus "*** Generate Password..."
# sfdx force:user:password:generate --json
# sfdx force:user:display
# showPrompt "Confirm..."




