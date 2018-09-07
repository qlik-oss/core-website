#!/usr/bin/env bash
pip install --upgrade pip --quiet && pip install mkdocs-material --quiet && mkdocs build && cp _redirects ./site
