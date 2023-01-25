const putOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        sides: { type: 'number' }
      }
    }
  }
}

export default async function (fastify, opts) {
  // PUT /settings/{user_id} route
  fastify.put('/:userId', putOptions, async function (request, reply) {
    request.log.info(`Saving settings for user ${request.params.userId}`);
    await fastify.db.saveSettings(request.params.userId, request.body);
    reply.code(204);
  });

  // GET
  fastify.get('/:userId', async function (request, reply) {
    request.log.info(`Retrieving settings for user ${request.params.userId}`);
    const settings = await fastify.db.getSettings(request.params.userId);
    if (settings) {
      return settings;
    }
    return { sides: 6 };
  });
}
