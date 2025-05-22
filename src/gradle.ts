import * as exec from '@actions/exec'
import path from 'path'

export async function generateDependenciesFiles(
  subdirectory: string,
  configuration: string,
  cwd?: string
): Promise<void> {
  await exec.getExecOutput(
    path.join(subdirectory, 'gradlew'),
    ['clean', 'dependencyReport', '--configuration', configuration],
    {
      cwd: cwd
    }
  )
}
