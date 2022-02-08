#!/usr/bin/env node
const yargs = require('yargs');
var fs = require('fs');

// Utils
const upperFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
const lowerFirstLetter = string => string.charAt(0).toLowerCase() + string.slice(1);

// Args
const generateFeatureCommand = yargs.usage('🚀 Usage: -f <name>').option('f', {
  alias: 'feature',
  describe: 'Generate a feature',
  type: 'string',
  demandOption: true
}).argv;

// Arg Selector
if (generateFeatureCommand) generateFeature(generateFeatureCommand.feature);

// Generate Feature
function generateFeature(name) {
  const featureDir = `./${upperFirstLetter(name)}s`;
  if (fs.existsSync(featureDir)) return console.log(`❗error: ${name} feature is already exists.`);
  console.log('Generating feature...');

  fs.mkdirSync(`${featureDir}`);
  generateFeatureCommands(featureDir, name);
  generateFeatureDtos(featureDir, name);
  generateFeatureModels(featureDir, name);
  generateFeatureProfiles(featureDir, name);
  generateFeatureQueries(featureDir, name);
  generateFeatureRules(featureDir, name);
}

function generateFeatureCommands(featureDir, name) {
  const upperName = upperFirstLetter(name),
    lowerName = lowerFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Commands`);
  fs.mkdirSync(`${featureDir}/Commands/Create${upperName}`);
  fs.writeFile(
    `${featureDir}/Commands/Create${upperName}/Create${upperName}Command.cs`,
    `using Application.Features.${upperName}s.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.${upperName}s.Commands.Create${upperName};

public class Create${upperName}Command : IRequest<${upperName}>
{
    //todo: add properties

    public class Create${upperName}CommandHandler : IRequestHandler<Create${upperName}Command, ${upperName}>
    {
        private readonly I${upperName}Repository _${lowerName}Repository;
        private readonly IMapper _mapper;
        private readonly ${upperName}BusinessRules _${lowerName}BusinessRules;

        public Create${upperName}CommandHandler(I${upperName}Repository ${lowerName}Repository, IMapper mapper,
                                         ${upperName}BusinessRules ${lowerName}BusinessRules)
        {
            _${lowerName}Repository = ${lowerName}Repository;
            _mapper = mapper;
            _${lowerName}BusinessRules = ${lowerName}BusinessRules;
        }

        public async Task<${upperName}> Handle(Create${upperName}Command request, CancellationToken cancellationToken)
        {
            ${upperName} mapped${upperName} = _mapper.Map<${upperName}>(request);
            ${upperName} created${upperName} = await _${lowerName}Repository.AddAsync(mapped${upperName});
            return created${name};
        }
    }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ Create${upperName}Command is created successfully.`);
    }
  );

  fs.mkdirSync(`${featureDir}/Commands/Update${name}`);
  fs.writeFile(
    `${featureDir}/Commands/Update${upperName}/Update${upperName}Command.cs`,
    `using Application.Features.${upperName}s.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.${upperName}s.Commands.Update${upperName};

public class Update${upperName}Command : IRequest<${upperName}>
{
    public int Id { get; set; }
    //todo: add properties

    public class Update${upperName}CommandHandler : IRequestHandler<Update${upperName}Command, ${upperName}>
    {
        private readonly I${upperName}Repository _${lowerName}Repository;
        private readonly IMapper _mapper;
        private readonly ${upperName}BusinessRules _${lowerName}BusinessRules;

        public Update${upperName}CommandHandler(I${upperName}Repository ${lowerName}Repository, IMapper mapper,
                                         ${upperName}BusinessRules ${lowerName}BusinessRules)
        {
            _${lowerName}Repository = ${lowerName}Repository;
            _mapper = mapper;
            _${lowerName}BusinessRules = ${lowerName}BusinessRules;
        }

        public async Task<${upperName}> Handle(Update${upperName}Command request, CancellationToken cancellationToken)
        {
            ${upperName} mapped${upperName} = _mapper.Map<${upperName}>(request);
            ${upperName} updated${upperName} = await _${lowerName}Repository.UpdateAsync(mapped${upperName});
            return updated${name};
        }
    }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ Update${upperName}Command is created successfully.`);
    }
  );

  fs.mkdirSync(`${featureDir}/Commands/Delete${name}`);
  fs.writeFile(
    `${featureDir}/Commands/Delete${upperName}/Delete${upperName}Command.cs`,
    `using Application.Features.${upperName}s.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.${upperName}s.Commands.Delete${upperName};

public class Delete${upperName}Command : IRequest<${upperName}>
{
    public int Id { get; set; }

    public class Delete${upperName}CommandHandler : IRequestHandler<Delete${upperName}Command, ${upperName}>
    {
        private readonly I${upperName}Repository _${lowerName}Repository;
        private readonly IMapper _mapper;
        private readonly ${upperName}BusinessRules _${lowerName}BusinessRules;

        public Delete${upperName}CommandHandler(I${upperName}Repository ${lowerName}Repository, IMapper mapper,
                                         ${upperName}BusinessRules ${lowerName}BusinessRules)
        {
            _${lowerName}Repository = ${lowerName}Repository;
            _mapper = mapper;
            _${lowerName}BusinessRules = ${lowerName}BusinessRules;
        }

        public async Task<${upperName}> Handle(Delete${upperName}Command request, CancellationToken cancellationToken)
        {
            await _${lowerName}BusinessRules.${upperName}IdShouldExistWhenSelected(request.Id);

            ${upperName} mapped${upperName} = _mapper.Map<${upperName}>(request);
            ${upperName} deleted${upperName} = await _${lowerName}Repository.DeleteAsync(mapped${upperName});
            return deleted${name};
        }
    }
}
`,
    err => (err ? err : console.log(`✅ Delete${upperName}Command is created successfully.`))
  );
}
function generateFeatureDtos(featureDir, name) {
  const upperName = upperFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Dtos`);
  fs.writeFile(
    `${featureDir}/Dtos/${upperName}ListDto.cs`,
    `namespace Application.Features.${upperName}s.Dtos;

public class ${upperName}ListDto
{
  public int Id { get; set; }
  //todo: add properties
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ ${upperName}ListDto is created successfully.`);
    }
  );
}
function generateFeatureModels(featureDir, name) {
  const upperName = upperFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Models`);
  fs.writeFile(
    `${featureDir}/Models/${upperName}ListModel.cs`,
    `using Application.Features.${upperName}s.Dtos;
using Core.Persistence.Paging;

namespace Application.Features.${upperName}s.Models;

public class ${upperName}ListModel : BasePageableModel
{
    public IList<${upperName}ListDto> Items { get; set; }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ ${upperName}ListModel is created successfully.`);
    }
  );
}
function generateFeatureProfiles(featureDir, name) {
  const upperName = upperFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Profiles`);
  fs.writeFile(
    `${featureDir}/Profiles/MappingProfiles.cs`,
    `using Application.Features.${upperName}s.Commands.Create${upperName};
using Application.Features.${upperName}s.Commands.Delete${upperName};
using Application.Features.${upperName}s.Commands.Update${upperName};
using Application.Features.${upperName}s.Dtos;
using Application.Features.${upperName}s.Models;
using AutoMapper;
using Core.Persistence.Paging;
using Domain.Entities;

namespace Application.Features.${upperName}s.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<${upperName}, Create${upperName}Command>().ReverseMap();
        CreateMap<${upperName}, Update${upperName}Command>().ReverseMap();
        CreateMap<${upperName}, Delete${upperName}Command>().ReverseMap();
        CreateMap<${upperName}, ${upperName}ListDto>().ReverseMap();
        CreateMap<IPaginate<${upperName}>, ${upperName}ListModel>().ReverseMap();
    }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ MappingProfiles is created successfully.`);
    }
  );
}
function generateFeatureQueries(featureDir, name) {
  const upperName = upperFirstLetter(name),
    lowerName = lowerFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Queries`);
  fs.mkdirSync(`${featureDir}/Queries/GetById${upperName}`);
  fs.writeFile(
    `${featureDir}/Queries/GetById${upperName}/GetById${upperName}Query.cs`,
    `using Application.Features.${upperName}s.Rules;
using Application.Services.Repositories;
using Domain.Entities;
using MediatR;

namespace Application.Features.${upperName}s.Queries.GetById${upperName};

public class GetById${upperName}Query : IRequest<${upperName}>
{
    public int Id { get; set; }

    public class GetById${upperName}QueryHandler : IRequestHandler<GetById${upperName}Query, ${upperName}>
    {
        private readonly I${upperName}Repository _${lowerName}Repository;
        private readonly ${upperName}BusinessRules _${lowerName}BusinessRules;

        public GetById${upperName}QueryHandler(I${upperName}Repository ${lowerName}Repository, ${upperName}BusinessRules ${lowerName}BusinessRules)
        {
            _${lowerName}Repository = ${lowerName}Repository;
            _${lowerName}BusinessRules = ${lowerName}BusinessRules;
        }


        public async Task<${upperName}> Handle(GetById${upperName}Query request, CancellationToken cancellationToken)
        {
            await _${lowerName}BusinessRules.${upperName}IdShouldExistWhenSelected(request.Id);

            ${upperName}? ${lowerName} = await _${lowerName}Repository.GetAsync(b => b.Id == request.Id);
            return ${lowerName};
        }
    }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ GetById${upperName}Query is created successfully.`);
    }
  );

  fs.mkdirSync(`${featureDir}/Queries/GetList${upperName}`);
  fs.writeFile(
    `${featureDir}/Queries/GetList${upperName}/GetList${upperName}Query.cs`,
    `using Application.Features.${upperName}s.Models;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Requests;
using Core.Persistence.Paging;
using Domain.Entities;
using MediatR;

namespace Application.Features.${upperName}s.Queries.GetList${upperName};

public class GetList${upperName}Query : IRequest<${upperName}ListModel>
{
    public PageRequest PageRequest { get; set; }

    public class GetList${upperName}QueryHandler : IRequestHandler<GetList${upperName}Query, ${upperName}ListModel>
    {
        private readonly I${upperName}Repository _${lowerName}Repository;
        private readonly IMapper _mapper;

        public GetList${upperName}QueryHandler(I${upperName}Repository ${lowerName}Repository, IMapper mapper)
        {
            _${lowerName}Repository = ${lowerName}Repository;
            _mapper = mapper;
        }

        public async Task<${upperName}ListModel> Handle(GetList${upperName}Query request, CancellationToken cancellationToken)
        {
            IPaginate<${upperName}> ${lowerName}s = await _${lowerName}Repository.GetListAsync(index: request.PageRequest.Page,
                                                                          size: request.PageRequest.PageSize);
            ${upperName}ListModel mapped${upperName}ListModel = _mapper.Map<${upperName}ListModel>(${lowerName}s);
            return mapped${upperName}ListModel;
        }
    }
}`,
    err => {
      if (err) throw err;
      console.log(`✅ GetList${upperName}Query is created successfully.`);
    }
  );
}
function generateFeatureRules(featureDir, name) {
  const upperName = upperFirstLetter(name),
    lowerName = lowerFirstLetter(name);

  fs.mkdirSync(`${featureDir}/Rules`);
  fs.writeFile(
    `${featureDir}/Rules/${upperName}BusinessRules.cs`,
    `using Application.Services.Repositories;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Persistence.Paging;
using Domain.Entities;

namespace Application.Features.${upperName}s.Rules;

public class ${upperName}BusinessRules
{
    private readonly I${upperName}Repository _${lowerName}Repository;

    public ${upperName}BusinessRules(I${upperName}Repository ${lowerName}Repository)
    {
        _${lowerName}Repository = ${lowerName}Repository;
    }
 
    public async Task ${upperName}IdShouldExistWhenSelected(int id)
    {
        ${upperName}? result = await _${lowerName}Repository.GetAsync(b => b.Id == id);
        if (result == null) throw new BusinessException("${upperName} not exists.");
    }
}
`,
    err => {
      if (err) throw err;
      console.log(`✅ ${upperName}BusinessRules is created successfully.`);
    }
  );
}
