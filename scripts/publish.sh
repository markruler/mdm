#!/usr/bin/env bash

# https://code.visualstudio.com/api/working-with-extensions/publishing-extension
# npm install -g @vscode/vsce
# vsce login

vsce package
vsce publish

