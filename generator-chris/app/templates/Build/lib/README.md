## What is this folder for?

Copy the following files into this folder for full build support:

1. ant-contrib-1.0b3.jar - needed for conditional logic in ant build scripts (download from the web)

Get the following jars from the Worklight server distribution:
2. json4j.jar - requirement for using application center deploy (e.g. found in /IBM/Worklight\ApplicationCenter/tools)
3. applicationcenterdeploytool.jar - You will need this to deploy apps to the IBM Application Center.  (e.g. found in /IBM/Worklight/ApplicationCenter/tools)
4. worklight-ant-builder.jar - needed for building wlapp, adapter and Worklight WARs (e.g. found in /IBM/Worklight/WorklightServer)
5. worklight-ant-deployer.jar - needed for deploying wlapp, adapter and Worklight WARs (e.g. found in /IBM/Worklight/WorklightServer)

If you plan to use the grunt tasks to set up DB2 and WAS Liberty as your Worklight server:
6. worklight-jee-library (e.g. found in /IBM/Worklight/WorklightServer)
7. db2jcc_license_*.jar (e.g. found in /IBM/SQLLIB/java)
8. db2jcc4.jar (e.g. found in /IBM/SQLLIB/java)

