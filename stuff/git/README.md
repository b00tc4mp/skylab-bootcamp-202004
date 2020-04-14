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

## How to sync your develop with upstream if by mistake you made commits while in your develop branch (be careful, ask if you have any doubts)

If you need the changes made in develop, back them up somewhere safe like your desktop. Eg. You started a challenge while in develop and made a commit already. In this case, copy the folder of the challenge in the desktop.

After this make shure you are in develop and, while in it, bring the updated remote develop from upstream

```sh
$ git checkout develop

$ git fetch upstrem
```

Now you need to reset your develop to the latest commit of Manu's repo.

```sh
$ git reset --hard upstream/develop
```

Now your HEAD points to Manu's develop latest commit, so your commit history is the same. This basically ate your commits done in develop, that is why is important to backup wanted changes before.

Next we need to also update YOUR remote develop to be the same as Manu's develop and YOUR local develop. A normal push will not work here since your local and remote branches have diverged, so we need to force it.

```sh
$ git push -f
```
And that's it. Now your develop (locally and remotely) is clean and the same as Manu's, how it should be.

## How to correct a wrongly made Pull Request

- First backup the folder somewhere safe like your desktop by copying the folder of the challenge. 

Now you have to move to develop and, just in case, update it. IF YOU MADE COMMITS WHILE ON DEVELOP REPLACE THE NEXT STEP WITH THE MINI GUIDE ABOVE OF THIS ONE.

```sh
$ git checkout develop

$ git fetch upstream

$ git merge upstream/develop
```

Next, you need to delete the the branch of the PR, both remotely and locally

```sh
$ git branch -d <branch-name>

$ git push origin :<branch-name>
```

Create the branch again and move into it.

```sh
$ git branch <branch-name>

$ git checkout <branch-name>
```

While in the branch, copy the backed up folder into your name folder.

After this, if you fo a  `git status` you will se the copied folder in red. So next we need to add it to the staging area, commit it and push it.

```sh
$ git add <path-to-new-folder> => the one that was shown red 

$ git commit -m "<descriptive-message>"

$ git push -u origin <branch-name>
```

Now you can go to github and create the pull request again.




# Git Commands to have in mind

Como hablamos ayer en la clase aca les dejo una lista con algunos comandos.

Some vocabulary first:

- **Untracked files**: new files that have been saved but never added to git. So if we try to do any other command than git add on them it will tell us that they are unknown to git. (Red)

- **Unstaged files**: files that are already being tracked by git but have new changes not added to the staging area.(Red)

- **Changes to be commited**: files changed and already added to the Staging Aread with git add.(Green)

## Every day commands (low risk)


 - ` $ git status`

 - ` $ git add <filepath>` => adds files to **Staging** area
 
 - ` $ git commit -m 'short descriptive messave'` => saves changes inside of the sataging area, creates a history point were we can go back if needed.
 
 - ` $ git push`, sends local changes to your own remote repo.
 
 - ` $ git push -u origin <branch name>`, when pushing a branch for the first time.
 
 - ` $ git branch` => shows local branches
 
 - ` $ git branch <branch name>` => creates a new branch using the current branch as base.
 
 - ` $ git branch -a` => shows all branches, local and remote
 
 - ` $ git branch -d <branch name>` => delete branch
 
 - ` $ git push origin :<branch name>` => delete remote branch
 
 - ` $ git checkout <branch name>` => switches to selected branch. If we have changes in staging area or unstaged but already being tracked we have to commit or stash them before. If we have untracked files it will take those untracked files with us to the other branch. 
 
 - ` $ git checkout <file name or path>`=> if a file is being tracked already by git and we have unstaged changes it will erase those changes until the point when it was staged.
 
 - ` $ git restore --staged <filename>` => this will remove the files in the Staging Area and leave them Unstaged. 
 
 - ` $ git fetch upstream` => while in `develop` brings updated manu's repo.
 
 - ` $ git merge upstream/develop` => to be run after fetch, merges them.
    
- ` $ git log` => shows commits history of a branch


## Also everyday (use with caution)
- ` $ git stash` => if we have uncommited changes and need to change branches for a moment you can save those changes without commiting. I say use with caution because if you forget that you have them and then change those files again and pop the stash you may have conflicts.

- ` $ git add .` => short way of adding ALL files in the CURRENT directory. If you use it pls make sure the files added correspond to the correct branch


- ` $ git pull` => this command fetches and merges at the same time.

## Commands to use rarely and with a lot of care


- ` $ git merge <branch being merged>` => integrates the changes from the branch being merged into the branch we are at the moment. NEVER merge a branch into develop. The flow is to make a PR and that will merge it.

- ` $ git rm <file>` => delete the file from project and stage the removal for commit. It only removes it for git.

- ### RESET commands are really dangerous pls be careful.

- ` $ git reset --hard HEAD` => will revert all staged and unstaged changes by reverting everything as it was in the last made commit.

- ` $ git reset --hard <commit hash>` => will revert to specified commit.