/*
 * Jakefile
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013, Your Company All rights reserved.
 */

var ENV = require("system").env,
    FILE = require("file"),
    JAKE = require("jake"),
    task = JAKE.task,
    FileList = JAKE.FileList,
    app = require("cappuccino/jake").app,
    configuration = ENV["CONFIG"] || ENV["CONFIGURATION"] || ENV["c"] || "Debug",
    OS = require("os");

app ("LaMejorcita", function(task)
{
    task.setBuildIntermediatesPath(FILE.join("Build", "LaMejorcita.build", configuration));
    task.setBuildPath(FILE.join("Build", configuration));

    task.setProductName("La Mejorcita");
    task.setIdentifier("com.yourcompany.LaMejorcita");
    task.setVersion("1.0");
    task.setAuthor("Your Company");
    task.setEmail("feedback @nospam@ yourcompany.com");
    task.setSummary("La Mejorcita");
    task.setSources((new FileList("**/*.j")).exclude(FILE.join("Build", "**")));
    task.setResources(new FileList("Resources/**"));
    task.setIndexFilePath("index.html");
    task.setInfoPlistPath("Info.plist");

    if (configuration === "Debug")
        task.setCompilerFlags("-DDEBUG -g");
    else
        task.setCompilerFlags("-O");
});

task ("default", ["LaMejorcita"], function()
{
    printResults(configuration);
});

task ("build", ["default"]);

task ("debug", function()
{
    ENV["CONFIGURATION"] = "Debug";
    JAKE.subjake(["."], "build", ENV);
});

task ("release", function()
{
    ENV["CONFIGURATION"] = "Release";
    JAKE.subjake(["."], "build", ENV);
});

task ("run", ["debug"], function()
{
    OS.system(["open", FILE.join("Build", "Debug", "LaMejorcita", "index.html")]);
});

task ("run-release", ["release"], function()
{
    OS.system(["open", FILE.join("Build", "Release", "LaMejorcita", "index.html")]);
});

task ("deploy", ["release"], function()
{
    FILE.mkdirs(FILE.join("Build", "Deployment", "LaMejorcita"));
    OS.system(["press", "-f", FILE.join("Build", "Release", "LaMejorcita"), FILE.join("Build", "Deployment", "LaMejorcita")]);
    printResults("Deployment")
});

task ("desktop", ["release"], function()
{
    FILE.mkdirs(FILE.join("Build", "Desktop", "LaMejorcita"));
    require("cappuccino/nativehost").buildNativeHost(FILE.join("Build", "Release", "LaMejorcita"), FILE.join("Build", "Desktop", "LaMejorcita", "LaMejorcita.app"));
    printResults("Desktop")
});

task ("run-desktop", ["desktop"], function()
{
    OS.system([FILE.join("Build", "Desktop", "LaMejorcita", "LaMejorcita.app", "Contents", "MacOS", "NativeHost"), "-i"]);
});

function printResults(configuration)
{
    print("----------------------------");
    print(configuration+" app built at path: "+FILE.join("Build", configuration, "LaMejorcita"));
    print("----------------------------");
}
