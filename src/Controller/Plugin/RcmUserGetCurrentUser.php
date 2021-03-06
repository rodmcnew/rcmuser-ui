<?php

namespace RcmUser\Ui\Controller\Plugin;

use RcmUser\Service\RcmUserService;
use Zend\Mvc\Controller\Plugin\AbstractPlugin;

/**
 * @deprecated Use \RcmUser\Api\Authentication\GetIdentity
 * @author James Jervis - https://github.com/jerv13
 */
class RcmUserGetCurrentUser extends AbstractPlugin
{

    /**
     * @var RcmUserService
     */
    protected $rcmUserService;

    /**
     * __construct
     *
     * @param RcmUserService $rcmUserService rcmUserService
     */
    public function __construct(
        RcmUserService $rcmUserService
    ) {
        $this->rcmUserService = $rcmUserService;
    }

    /**
     * @deprecated Use RcmUserService->getCurrentUser()
     * __invoke
     *
     * @param mixed $default default
     *
     * @return null|\RcmUser\User\Entity\UserInterface
     */
    public function __invoke($default = null)
    {
        $user = $this->rcmUserService->getIdentity($default);

        return $user;
    }
}
