#!/usr/bin/env bash

pip install --upgrade pip --quiet && pip install mkdocs-material==3.0.3 --quiet && mkdocs build && cp _redirects ./site
