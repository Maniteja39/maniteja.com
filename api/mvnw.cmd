@ECHO OFF
SETLOCAL
WHERE mvn >NUL 2>NUL
IF %ERRORLEVEL% EQU 0 (
  mvn %*
  EXIT /B %ERRORLEVEL%
)
ECHO Apache Maven is required to run this project. Install Maven or use a JDK that bundles it.
EXIT /B 1
