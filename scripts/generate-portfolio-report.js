#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

async function generatePortfolioReport() {
  console.log(
    chalk.blue("🚀 Generating Test Automation Portfolio Report...\n")
  );

  const reportData = {
    portfolioInfo: {
      name: "Test Automation Portfolio",
      author: "Javier Abós Abroj",
      generatedAt: new Date().toISOString(),
      summary:
        "Practical test automation setup using Playwright and Cypress for real-world testing scenarios",
    },
    projects: [],
  };

  // Define projects
  const projects = [
    {
      name: "Playwright + Cucumber Suite",
      path: "playwright-cucumber",
      technologies: ["Playwright", "Cucumber.js", "JavaScript", "BDD"],
      features: [
        "Cross-browser automation (Chrome, Firefox, Safari)",
        "BDD with Gherkin scenarios",
        "Page Object Model pattern",
        "Environment configuration management",
        "HTML and JSON reporting",
      ],
    },
    {
      name: "Cypress Testing Suite",
      path: "cypress",
      technologies: ["Cypress", "JavaScript", "Visual Testing"],
      features: [
        "Component isolation testing",
        "Visual regression with Percy",
        "Real-time test debugging",
        "Custom commands and utilities",
        "API mocking and interception",
      ],
    },
  ];

  // Process each project
  for (const project of projects) {
    console.log(chalk.yellow(` Processing ${project.name}...`));

    try {
      const projectPath = path.join(process.cwd(), project.path);
      const readmePath = path.join(projectPath, "README.md");
      const packagePath = path.join(projectPath, "package.json");

      const projectInfo = {
        ...project,
        hasReadme: await fs.pathExists(readmePath),
        hasPackageJson: await fs.pathExists(packagePath),
        structure: await getProjectStructure(projectPath),
      };

      if (projectInfo.hasPackageJson) {
        try {
          const packageJson = await fs.readJson(packagePath);
          projectInfo.scripts = Object.keys(packageJson.scripts || {});
          projectInfo.dependencies = Object.keys(
            packageJson.dependencies || {}
          );
        } catch (error) {
          console.log(
            chalk.red(`    Error reading package.json: ${error.message}`)
          );
        }
      }

      reportData.projects.push(projectInfo);
      console.log(chalk.green(`  ✅ ${project.name} processed successfully`));
    } catch (error) {
      console.log(
        chalk.red(`   Error processing ${project.name}: ${error.message}`)
      );
    }
  }

  // Generate HTML report
  const htmlReport = generateHtmlReport(reportData);
  const reportsDir = path.join(process.cwd(), "reports");
  await fs.ensureDir(reportsDir);

  const reportPath = path.join(reportsDir, "portfolio-report.html");
  await fs.writeFile(reportPath, htmlReport);

  // Generate JSON report
  const jsonReportPath = path.join(reportsDir, "portfolio-data.json");
  await fs.writeJson(jsonReportPath, reportData, { spaces: 2 });

  console.log(chalk.green("\\n Portfolio report generated successfully!"));
  console.log(chalk.blue(` HTML Report: ${reportPath}`));
  console.log(chalk.blue(` JSON Data: ${jsonReportPath}`));
}

async function getProjectStructure(projectPath) {
  try {
    const items = await fs.readdir(projectPath);
    const structure = [];

    for (const item of items) {
      const itemPath = path.join(projectPath, item);
      const stats = await fs.stat(itemPath);

      if (
        stats.isDirectory() &&
        !item.startsWith(".") &&
        item !== "node_modules"
      ) {
        structure.push({
          name: item,
          type: "directory",
          children: await getDirectoryContents(itemPath),
        });
      } else if (stats.isFile() && !item.startsWith(".")) {
        structure.push({
          name: item,
          type: "file",
        });
      }
    }

    return structure;
  } catch (error) {
    return [];
  }
}

async function getDirectoryContents(dirPath) {
  try {
    const items = await fs.readdir(dirPath);
    return items
      .filter((item) => !item.startsWith("."))
      .slice(0, 10) // Limit to first 10 items
      .map((item) => ({ name: item, type: "file" }));
  } catch (error) {
    return [];
  }
}

function generateHtmlReport(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.portfolioInfo.name} - Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 10px; margin-bottom: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header p { font-size: 1.2em; opacity: 0.9; }
        .meta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .meta-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .meta-card h3 { color: #667eea; margin-bottom: 10px; }
        .project { background: white; margin: 20px 0; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .project h2 { color: #333; margin-bottom: 15px; font-size: 1.8em; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0; }
        .tech-tag { background: #667eea; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85em; }
        .features { margin: 20px 0; }
        .features ul { list-style: none; }
        .features li { padding: 5px 0; }
        .features li:before { content: "✅ "; margin-right: 8px; }
        .structure { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .structure h4 { margin-bottom: 10px; color: #495057; }
        .file-tree { font-family: monospace; font-size: 0.9em; }
        .scripts { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0; }
        .script-card { background: #e9ecef; padding: 15px; border-radius: 6px; }
        .script-card h5 { color: #495057; margin-bottom: 8px; }
        .footer { text-align: center; margin-top: 40px; padding: 20px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1> ${data.portfolioInfo.name}</h1>
            <p>${data.portfolioInfo.summary}</p>
        </div>
        
        <div class="meta-info">
            <div class="meta-card">
                <h3>👨 Author</h3>
                <p>${data.portfolioInfo.author}</p>
            </div>
            <div class="meta-card">
                <h3> Generated</h3>
                <p>${new Date(
                  data.portfolioInfo.generatedAt
                ).toLocaleString()}</p>
            </div>
            <div class="meta-card">
                <h3> Projects</h3>
                <p>${data.projects.length} Testing Suites</p>
            </div>
            <div class="meta-card">
                <h3> Technologies</h3>
                <p>${
                  [...new Set(data.projects.flatMap((p) => p.technologies))]
                    .length
                } Frameworks</p>
            </div>
        </div>
        
        ${data.projects
          .map(
            (project) => `
            <div class="project">
                <h2>${project.name}</h2>
                
                <div class="tech-tags">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
                
                <div class="features">
                    <h4> Key Features:</h4>
                    <ul>
                        ${project.features
                          .map((feature) => `<li>${feature}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                ${
                  project.scripts
                    ? `
                    <div class="scripts">
                        <h4> Available Scripts:</h4>
                        ${project.scripts
                          .slice(0, 6)
                          .map(
                            (script) => `
                            <div class="script-card">
                                <h5>npm run ${script}</h5>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
                
                <div class="structure">
                    <h4>📁 Project Structure:</h4>
                    <div class="file-tree">
                        ${generateFileTree(project.structure)}
                    </div>
                </div>
            </div>
        `
          )
          .join("")}
        
        <div class="footer">
            <p>Generated by Test Automation Portfolio Generator</p>
            <p>Testing different frameworks and approaches</p>
        </div>
    </div>
</body>
</html>`;
}

function generateFileTree(structure, indent = "") {
  if (!structure || !Array.isArray(structure)) return "";

  return structure
    .map((item) => {
      const icon = item.type === "directory" ? "" : "";
      let result = `${indent}${icon} ${item.name}<br>`;

      if (item.children && item.children.length > 0) {
        result += generateFileTree(
          item.children.slice(0, 5),
          indent + "&nbsp;&nbsp;&nbsp;&nbsp;"
        );
      }

      return result;
    })
    .join("");
}

// Run the script
if (require.main === module) {
  generatePortfolioReport().catch((error) => {
    console.error(chalk.red("Error generating portfolio report:"), error);
    process.exit(1);
  });
}

module.exports = { generatePortfolioReport };
