# run autoflake on all python files

# get imports from requirements.txt, converting newlines to commas
# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo $SCRIPTPATH
# get path to requirements.txt (in parent directory)
REQ_FILE="$SCRIPTPATH/../requirements.txt"

REQ_CONTENTS=$(cat $REQ_FILE)
echo $REQ_CONTENTS

# remove semantic versioning from requirements (e.g. ">=1.2.3")
REQ_CONTENTS=$(echo $REQ_CONTENTS | sed 's/[>=<]//g')

# remove comments from requirements (e.g. "django==1.2.3 # comment")
REQ_CONTENTS=$(echo $REQ_CONTENTS | sed 's/#.*//g')

# change newlines to commas
REQ_CONTENTS=$(echo $REQ_CONTENTS | tr '\n' ',')

echo "Requirements: $REQ_CONTENTS"

# this isn
PY_FILES=$(find $SCRIPTPATH/../ -name "*.py")
echo $PY_FILES

# run autoflake on all python files
autoflake -i --ignore-init-module-imports --remove-unused-variables --recursive --imports=$REQ_FILE files $PY_FILES
