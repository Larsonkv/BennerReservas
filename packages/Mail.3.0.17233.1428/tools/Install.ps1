param($installPath, $toolsPath, $package, $project)

$project.Save()

$mailLicense = $project.ProjectItems.Item("MailLicense.xml")
$mailLicense.Properties.Item("CopyToOutputDirectory").Value = [int]2;

$project.Save()