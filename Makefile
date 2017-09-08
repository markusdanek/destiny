PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: setup main

setup:
	npm install

dev: setup
	@babel src/ -d build -w

build: setup
	@babel src/ -d build
	@webpack

main: build
