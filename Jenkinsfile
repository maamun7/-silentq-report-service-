pipeline {
	environment {
		BUILDHOST = '134.209.103.38' 
		SSHCMD = "ssh -o StrictHostKeyChecking=no jenkins@${env.BUILDHOST}"
		registry = "maamun7/sq-report-service"
		PATH = "$PATH:/usr/local/bin"
	}
  
    agent any
  
    stages {
		stage('Cloning Git') {
			steps {
				git credentialsId: 'git-credents', url: 'https://github.com/maamun7/silentq-report-service'
			}
		}
		stage('Copy Remote Server') {
			steps {
				sshPublisher(publishers: [sshPublisherDesc(configName: 'dev-server-jenkins', transfers: [
					sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', 
						remoteDirectory: '//var/silentq/report-service/', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/'
					)], 
					usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)
				])
			}
		}
		stage('Build Ansible') {
			steps {
				sshagent(['12855018-c089-42ad-80b7-7259ae72fe37']) {
					sh """${SSHCMD} '''
					ansible-playbook /var/silentq/report-service/Ansible.yml
					'''
				"""
				}
			}
		}
		stage('Remove Image') {
			steps {
				sshagent(['12855018-c089-42ad-80b7-7259ae72fe37']) {
					sh """${SSHCMD} '''					
						rm -rf /var/silentq/report-service/*
					'''
				"""
				}
			}
		}
    }
}
