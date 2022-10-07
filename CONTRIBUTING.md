# 📃 Contribution Guide

## ❓ What to contribute?

This project is for hacktoberfest to encourage new developer and open source developers to contribute to open source and improve skills which require debugging, write testable code, industry standards, problem solving and many more.

## ❗ Important

Make sure that each project you create has a `index.html` file. The HTML file should be named `index.html` and placed in the root directory of your project.

## 🤔 How to contribute?

Here are the steps you can follow to start contributing:

**Step 1:** From the issues page, select an issue which you think you can solve.

**Step 2:** Fork the repository using the `Fork` option on the top-right corner of the page.

**Step 3:** Clone forked version on your local machine:

```git
git clone https://github.com/<your_github_username>/css-awesomeness.git
```

**Step 4:** Go inside cloned folder and add the original repository as `upstream`:

```git
git remote add upstream https://github.com/shikhar13012001/css-awesomeness.git
```

**Step 5:** Copy your JavaScript project inside the `/projects` folder.

**Step 6:** Checkout to a new branch:

```git
git branch -b <branch_name>
```

(you can use the following format for the branch name: `<your_github_username>-issue-<issue_number>`)

**Step 7:** Make the desired changes to the code base. Also, before moving to the next step, make sure:

- [x] Code follows the style guidelines of this project
- [x] You have performed a self-review of my your own code
- [x] You have commented your code, particularly in hard-to-understand areas
- [x] You have made corresponding changes to the documentation
- [x] Your changes generate no new warnings

**Step 8:** Stage the changes, create a commit, and finally push the code to your forked repository:

```git
# stage all the changes
git add .

# commit the staged changes
git commit -m "<appropriate_commit_message>"

# push the code
git push origin <branch_name>
```

**Step 9:** Create a pull request:

1. Go to the `pull requests` page on the original repository.
2. Click on `compare & pull request` option visible on the top.
3. Follow the Pull Request template provided to add the details.
4. Now click on `Create pull request`.

**Step 10:** Discuss with the mentors if any changes are required on the pull request, before it gets merged.

That it 🎉

## 🤔 What if all the issues are already assigned?

If all the issues are already assigned, you can create your own issues.

> NOTE: While creating your own issues, make sure to strictly follow the provided issue template. You can leave things blank which are not applicable, but just follow the pattern.
