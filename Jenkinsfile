pipeline {
	environment {
		BUILDHOST = '134.209.103.38' 
		SSHCMD = "ssh -o StrictHostKeyChecking=no jenkins@${env.BUILDHOST}"
		registry = "maamun7/sq-report-service"
		docPass = ""
		dockerImage = ''
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
		stage('Building Image') {
			steps {
				sshagent(['12855018-c089-42ad-80b7-7259ae72fe37']) {
					sh """${SSHCMD} '''
					cd /var/silentq/report-service
					npm install
					docker-compose build
					docker login --username maamun7 --password ${docPass}
					docker tag report-service ${registry}
					docker push ${registry}
					'''
				"""
				}
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
						docker image rm maamun7/sq-report-service -f
						docker image rm report-service -f
					'''
				"""
				}
			}
		}
    }
}
