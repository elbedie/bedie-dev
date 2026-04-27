(function () {
  'use strict';

  angular.module('portfolioApp', [])
    .controller('DesktopController', ['$interval', '$document', function ($interval, $document) {
      var vm = this;
      var zIndex = 30;

      vm.selectedIcon = null;
      vm.startOpen = false;
      vm.clock = '';

      vm.desktopIcons = [
        { id: 'about', label: 'Sobre Mim', icon: 'assets/img/my-computer-icon.png' },
        { id: 'stack', label: 'Tech Stack', icon: 'assets/img/folder-icon.png' },
        { id: 'projects', label: 'Projetos', icon: 'assets/img/folder-icon.png' },
        { id: 'contact', label: 'Contato', icon: 'assets/img/notepad-icon.png' },
        { id: 'linkedin', label: 'LinkedIn', icon: 'assets/img/ie-icon.png', external: true }
      ];

      vm.menuItems = vm.desktopIcons.filter(function (x) { return !x.external; });

      vm.windows = [
        createWindow('about', 'Sobre Mim', 'assets/img/my-computer-icon.png', 'views/about.html', 170, 55, 720, 430, true),
        createWindow('stack', 'Tech Stack', 'assets/img/folder-icon.png', 'views/tech-stack.html', 210, 85, 720, 480, false),
        createWindow('projects', 'Projetos', 'assets/img/folder-icon.png', 'views/projects.html', 240, 100, 780, 470, false),
        createWindow('contact', 'Contato', 'assets/img/notepad-icon.png', 'views/contact.html', 270, 120, 620, 470, false)
      ];

      vm.projects = [
        {
          id: 1,
          name: 'Urbanize',
          type: 'Web Platform',
          date: '2026',
          description:
            'Plataforma de gestão de demandas urbanas com diferenciação de perfis (Cidadão e Gestor). Sistema com abertura, triagem e acompanhamento de chamados.',
          tech: ['Next.js', 'TypeScript', 'React', 'Node.js'],
          icon: 'folder',
          link: 'https://github.com/elbedie/urbanize'
        },

        {
          id: 2,
          name: 'Even3 Bot',
          type: 'Automação',
          date: '2026',
          description:
            'Bot em Python para automações em ambiente de testes, incluindo criação de eventos e personalização de configurações na plataforma.',
          tech: ['Python', 'Selenium', 'Automation'],
          icon: 'file',
          link: 'https://github.com/elbedie/even3_bot'
        },

        {
          id: 3,
          name: 'SAGE — Sistema de Acompanhamento e Gerenciamento de Equipamentos Hospitalares',
          type: 'Sistema Desktop',
          date: '2025',
          description:
            'Aplicação orientada a objetos em Java para gerenciamento de manutenção de equipamentos hospitalares, com controle de ordens de serviço e indicadores.',
          tech: ['Java', 'POO', 'OOP', 'Desktop'],
          icon: 'folder',
          link: 'https://github.com/elbedie/SAGE_POO'
        },

        {
          id: 4,
          name: 'Sistema de Assinatura de Documentos',
          type: 'Feature',
          date: '2026',
          description:
            'Implementação de assinatura digital com fluxo de signatários, geração de tokens, validação de acesso e registro de timeline de eventos.',
          tech: ['C#', 'ASP.NET MVC', 'JWT', 'Azure'],
          icon: 'file',
          link: 'https://github.com/elbedie'
        }
      ];

      vm.selectedProject = vm.projects[0];
      vm.openRepository = function (link) {window.open(link, '_blank');};

      vm.skills = [
        skill('C#', 'https://skillicons.dev/icons?i=cs', 'Avançado', 'Desenvolvimento backend, regras de negócio e manutenção de aplicações em produção.', 'Backend'),
        skill('.NET', 'https://skillicons.dev/icons?i=dotnet', 'Avançado', 'ASP.NET MVC, APIs e aplicações web.', 'Backend'),
        skill('Python', 'https://skillicons.dev/icons?i=python', 'Intermediário', 'Scripts, automações e experimentos com dados.', 'Backend'),
        skill('JavaScript', 'https://skillicons.dev/icons?i=javascript', 'Avançado', 'Lógica de interface e manutenção de aplicações web.', 'Frontend'),
        skill('AngularJS', 'https://skillicons.dev/icons?i=angular', 'Avançado', 'Controllers, diretivas, views e aplicações legadas.', 'Frontend'),
        skill('React', 'https://skillicons.dev/icons?i=react', 'Intermediário', 'Componentes e interfaces modernas.', 'Frontend'),
        skill('HTML', 'https://skillicons.dev/icons?i=html', 'Avançado', 'Estruturação de páginas e interfaces.', 'Frontend'),
        skill('CSS', 'https://skillicons.dev/icons?i=css', 'Avançado', 'Layout, responsividade e refinamento visual.', 'Frontend'),
        skill('Bootstrap', 'https://skillicons.dev/icons?i=bootstrap', 'Intermediário', 'Interfaces responsivas e sistemas legados.', 'Frontend'),
        skill('SQL Server', 'https://skillicons.dev/icons?i=postgres', 'Avançado', 'Consultas, procedures e modelagem relacional.', 'Database'),
        skill('PostgreSQL', 'https://skillicons.dev/icons?i=postgres', 'Intermediário', 'Banco relacional para projetos web.', 'Database'),
        skill('MySQL', 'https://skillicons.dev/icons?i=mysql', 'Intermediário', 'Consultas e persistência de dados.', 'Database'),
        skill('Git', 'https://skillicons.dev/icons?i=git', 'Avançado', 'Branches, commits, merge e colaboração.', 'Ferramentas'),
        skill('GitHub', 'https://skillicons.dev/icons?i=github', 'Avançado', 'Repositórios, PRs e versionamento.', 'Ferramentas'),
        skill('VS Code', 'https://skillicons.dev/icons?i=vscode', 'Avançado', 'Editor principal para frontend e scripts.', 'Ferramentas'),
        skill('Visual Studio', 'https://skillicons.dev/icons?i=visualstudio', 'Intermediário', 'IDE para desenvolvimento .NET.', 'Ferramentas'),
        skill('Java','https://skillicons.dev/icons?i=java','Iniciante','Programação orientada a objetos e desenvolvimento de sistemas acadêmicos.','Backend')
      ];
      vm.selectedSkill = vm.skills[0];

      vm.form = { name: '', email: '', message: '' };
      vm.sent = false;

      vm.selectIcon = function (id) { vm.selectedIcon = id; };
      vm.toggleStart = function () { vm.startOpen = !vm.startOpen; };
      vm.closeStart = function () { vm.startOpen = false; vm.selectedIcon = null; };

      vm.openIcon = function (icon) {
        if (icon.external) {
          window.open('https://www.linkedin.com/in/diego-david-600608199/', '_blank');
          return;
        }
        vm.openWindow(icon.id);
      };

      vm.openWindow = function (id) {
        var win = findWindow(id);
        if (!win) return;
        win.open = true;
        win.minimized = false;
        vm.focus(win);
      };

      vm.focus = function (win) { win.z = ++zIndex; };
      vm.close = function (win) { win.open = false; };
      vm.minimize = function (win) { win.minimized = true; };
      vm.restore = function (win) { win.minimized = !win.minimized; win.open = true; vm.focus(win); };
      vm.selectProject = function (project) { vm.selectedProject = project; };
      vm.selectSkill = function (skill) { vm.selectedSkill = skill; };

      vm.sendMessage = function () {

        var templateParams = {
          name: vm.form.name,
          email: vm.form.email,
          message: vm.form.message
        };

        emailjs.send(
          "service_c4q67il",
          "template_zizii3h",
          templateParams
        ).then(function (response) {

          console.log("Email enviado!", response.status, response.text);

          vm.sent = true;

          vm.form = {
            name: '',
            email: '',
            message: ''
          };

        }, function (error) {

          console.error("Erro ao enviar email:", error);

          alert("Erro ao enviar mensagem. Tente novamente.");

        });

      };
      vm.clearForm = function () { vm.form = { name: '', email: '', message: '' }; };

      vm.getSkillsByCategory = function (category) {
        return vm.skills.filter(function (s) { return s.category === category; });
      };

      vm.startDrag = function (event, win) {
        event.preventDefault();
        vm.focus(win);
        var startX = event.clientX;
        var startY = event.clientY;
        var originalX = win.x;
        var originalY = win.y;

        function mousemove(e) {
          win.x = Math.max(0, Math.min(window.innerWidth - 120, originalX + e.clientX - startX));
          win.y = Math.max(0, Math.min(window.innerHeight - 70, originalY + e.clientY - startY));
          angular.element(document.body).scope().$applyAsync();
        }
        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      };

      function updateClock() {
        var now = new Date();
        vm.clock = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
      updateClock();
      $interval(updateClock, 30000);

      function createWindow(id, title, icon, template, x, y, width, height, open) {
        return { id: id, title: title, icon: icon, template: template, x: x, y: y, width: width, height: height, open: open, minimized: false, z: ++zIndex };
      }
      function findWindow(id) { return vm.windows.find(function (w) { return w.id === id; }); }
      function skill(name, icon, level, description, category) { return { name: name, icon: icon, level: level, description: description, category: category }; }
    }]);
})();
