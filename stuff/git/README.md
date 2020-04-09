## How to update my `develop` and then my `working branch` with changes from `upstream`

Keep your local ongoing changes in `stash`

```sh
$ git add <your-files>

$ git stash
```

Update your `develop` branch

```sh
$ git checkout develop

$ git fetch upstream

$ git merge upstream/develop
```

Update your `origin/develop` branch

```sh
$ git push
```

Go back to working branch

```sh
$ git checkout feature/<your-feature>

$ git merge develop

$ git stash pop
```