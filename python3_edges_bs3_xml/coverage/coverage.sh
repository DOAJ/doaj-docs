coverage run --source=portality,combinatrix,esprit,dictdiffer $(which nosetests) doajtest/unit/
coverage html --include=portality*.py -d ~/doaj-docs/coverage/report
