#!/usr/bin/env bash
set -eo pipefail

BASE="$( cd "$( dirname "$0" )" >/dev/null 2>&1 && pwd )"
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd )"

pushd "$BASE"/../

main() {
    ENV=$1

    case $ENV in
    local)
      echo use "local" env
      export FRONTEND_HOST="http://localhost:3000/"
      ;;
    dev)
      echo use "dev: https://torb.now.sh/" env
      export FRONTEND_HOST="https://torb.now.sh/"
      ;;
    *)
      echo unkown env "$ENV"
      exit 1
      ;;
    esac

    pushd env/base/
    FILES=$(find . -type f)
    popd

    for f in $FILES
    do
      writeTemplateFile "$f"
    done

    echo "$ENV" > "$BASE"/.current_project
    echo "switched to env $ENV"
}


writeTemplateFile() {
  FILE_PATH=$1
  FILE_DIR=$(dirname "${FILE_PATH}")
  mkdir -p "$FILE_DIR"
  rm -f "$ROOT"/"$FILE_PATH"
  "$BASE"/mo "$BASE"/base/"$FILE_PATH" > "$ROOT"/"$FILE_PATH"
  chmod 400 "$ROOT"/"$FILE_PATH"
}

if [ -n "${1-}" ]
then
  main "$1"
else
  printf './use.sh ENV \nexample: ./use.sh dev'
fi
